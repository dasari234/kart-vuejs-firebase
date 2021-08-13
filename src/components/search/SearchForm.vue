<template>
  <div>
    <div class="main-wrapper-index">
      <div class="content">
        <div class="serch-form center-div">
          <div class="wrapper">
            <div class="twidget-container" id="twidget">
              <SearchType @search-type-value="onSearchTypeChecked"></SearchType>
              <div class="twidget-tab-content">
                <ul class="twidget-form-list clearfix">
                  <li class="twidget-origin twidget-city">
                    <div class="twidget-input-box" select-input>
                      <label>Origin</label>
                      <div class="twidget-autocomplete">
                        <vue-bootstrap-typeahead
                          class="mb-4"
                          v-model="routeInfos[0].fromCityOrAirport.code"
                          :data="cities"
                          :serializer="item => item.city"
                          placeholder="Select City"
                        >
                          <template slot="suggestion" slot-scope="{ data, htmlText }">
                            <div class="d-flex align-items-center">
                              <div style="width:89%" v-html="htmlText">{{data.city}}</div>
                              <div
                                class="d-flex justify-content-between align-items-center"
                                style="width:100%"
                              >
                                <span class="ml-4">{{data.name}}</span>
                                <span class="ml-4">{{data.iataCode}}</span>
                              </div>
                            </div>
                          </template>
                        </vue-bootstrap-typeahead>
                      </div>
                    </div>
                  </li>
                  <li class="twidget-destination twidget-city">
                    <div class="twidget-input-box" select-input>
                      <label>Destination</label>
                      <div class="twidget-autocomplete">
                        <vue-bootstrap-typeahead
                          class="mb-4"
                          v-model="routeInfos[0].toCityOrAirport.code"
                          :data="cities"
                          :serializer="item => item.city"
                          placeholder="Select City"
                        >
                          <template slot="suggestion" slot-scope="{ data, htmlText }">
                            <div class="d-flex align-items-center">
                              <div style="width:89%" v-html="htmlText">{{data.city}}</div>
                              <div
                                class="d-flex justify-content-between align-items-center"
                                style="width:100%"
                              >
                                <span class="ml-4">{{data.name}}</span>
                                <span class="ml-4">{{data.iataCode}}</span>
                              </div>
                            </div>
                          </template>
                        </vue-bootstrap-typeahead>
                      </div>
                    </div>
                  </li>
                  <li class="twidget-flight-dates input-daterange input-group clearfix">
                    <div class="twidget-input-box">
                      <label>Depart date</label>
                      <div class="twidget-input-box-show-popup">
                        <date-picker
                          v-model="routeInfos[0].travelDate"
                          :disabled-date="notBeforeToday"
                          value-type="format"
                          format="YYYY-MM-DD"
                        ></date-picker>

                        <span class="twidget-date-text twidget-date-depart">{{departDate}}</span>
                      </div>
                    </div>

                    <div class="twidget-input-box">
                      <label>Return date</label>
                      <div class="twidget-input-box-show-popup">
                        <date-picker
                          v-model="toDate"
                          :disabled-date="notBeforeToday"
                          value-type="format"
                          format="YYYY-MM-DD"
                          :disabled="roundWay"
                        ></date-picker>
                        <span class="twidget-date-text twidget-date-depart">{{returnDate}}</span>
                      </div>
                    </div>
                  </li>
                  <li class="twidget-passengers">
                    <div>
                      <label>Passengers/Class</label>
                      <div
                        class="twidget-passengers-detail"
                        :class="{active:showPassengerInfo}"
                        v-on:click="showPassengerInfo = !showPassengerInfo"
                        id="popover-button-variant"
                      >
                        <div class="twidget-pas-no">
                          <span id="twidget-pas">{{totalPassenger}}</span>
                          <span class="twidget-pas-caption">passenger(s)</span>
                        </div>
                        <div class="twidget-class">{{cabinServiceClass}}</div>
                      </div>

                      <b-popover
                        target="popover-button-variant"
                        :show.sync="showPassengerInfo"
                        placement="bottom"
                        triggers="focus"
                      >
                        <template v-slot:title>
                          <div class="close-icon" @click="onClose">&times;</div>Travellers
                        </template>

                        <div id="twidget-passenger-form">
                          <div class="twidget-passenger-form-wrapper">
                            <ul class="twidget-age-group">
                              <li>
                                <Passengers
                                  passenger="ADULTS (12y +)"
                                  :quantity="paxInfo.ADULT"
                                  @quantity-value="onPassengerClicked"
                                ></Passengers>
                              </li>
                              <li>
                                <Passengers
                                  passenger="CHILDREN (2y - 12y)"
                                  :quantity="paxInfo.CHILD"
                                  @quantity-value="onChildClicked"
                                ></Passengers>
                              </li>
                              <li>
                                <Passengers
                                  passenger="INFANTS (below 2y)"
                                  :quantity="paxInfo.INFANT"
                                  @quantity-value="onInfantClicked"
                                ></Passengers>
                              </li>
                            </ul>
                            <CabinClass @checkbox-value="onClassChecked"></CabinClass>
                          </div>
                        </div>
                      </b-popover>
                    </div>
                  </li>
                  <li class="twidget-submit-button">
                    <button v-on:click="searchFlights">Search</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="proposals-message" v-if="isPreloader">
      <Preloader v-if="isPreloader"></Preloader>
      <div>Looking for tickets, please wait...</div>
    </div>

    <div v-if="isData">
      <div>Flights from New Delhi to Bengaluru, and back</div>
      <div class="flights" :class="searchType">
        <Flights :flights="onwordFlights"></Flights>
        <Flights :flights="returnFlights"></Flights>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/search-form.css";
import "../../assets/date-picker.css";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import json from "../../assets/airports-india.json";
import Passengers from "@/components/search/Passengers";
import CabinClass from "@/components/search/CabinClass";
import SearchType from "@/components/search/SearchType";
import Preloader from "@/components/search/Preloader";
import Flights from "@/components/search/Flights";
// import FindCity from "@/components/search/FindCity";

import axios from "axios";
import DatePicker from "vue2-datepicker";
import * as moment from "moment/moment";
const auth = {
  "Content-Type": "application/json",
  headers: { apikey: "711431d46e828a-19de-458f-8519-b601990b6072" }
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export default {
  name: "dashboard",
  components: {
    DatePicker,
    Passengers,
    CabinClass,
    SearchType,
    Preloader,
    Flights,
    VueBootstrapTypeahead
  },
  data: () => ({
    isPreloader: false,
    searchIds: [],
    toDate: null,
    cabinServiceClass: "economy",
    showPassengerInfo: false,
    searchType: "ONEWAY",
    onwordFlights: null,
    returnFlights: null,
    isData: false,
    cities: json,
    paxInfo: {
      ADULT: 1,
      CHILD: 0,
      INFANT: 0
    },
    routeInfos: [
      {
        fromCityOrAirport: {
          code: null
        },
        toCityOrAirport: {
          code: null
        },
        travelDate: moment(today).format("YYYY-MM-DD")
      }
    ]
  }),
  computed: {
    totalPassenger() {
      return this.paxInfo.ADULT + this.paxInfo.CHILD + this.paxInfo.INFANT;
    },
    departDate() {
      if (this.routeInfos[0].travelDate) {
        return moment(this.routeInfos[0].travelDate).format("D MMM'YY, dddd");
      } else {
        return this.routeInfos[0].travelDate;
      }
    },
    returnDate() {
      if (this.toDate) {
        return moment(this.toDate).format("D MMM'YY, dddd");
      } else {
        return this.toDate;
      }
    },
    roundWay() {
      if (this.searchType == "ONEWAY") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    notBeforeToday(date) {
      return date < today;
    },
    onClose() {
      this.showPassengerInfo = !this.showPassengerInfo;
    },
    onClassChecked: function(value) {
      this.cabinServiceClass = value;
    },
    onPassengerClicked: function(val) {
      this.paxInfo.ADULT = val;
    },
    onChildClicked: function(val) {
      this.paxInfo.CHILD = val;
    },
    onInfantClicked: function(val) {
      this.paxInfo.INFANT = val;
    },
    onSearchTypeChecked: function(sType) {
      this.searchType = sType;
    },
    async searchFlights() {
      console.log("**", this.routeInfos);
      const data = {
        searchQuery: {
          cabinClass: this.cabinServiceClass.toUpperCase(),
          paxInfo: this.paxInfo,
          routeInfos: [...this.routeInfos],
          searchModifiers: {
            isDirectFlight: true,
            isConnectingFlight: false
          },
          searchType: this.searchType
        }
      };

      if (
        (this.searchType == "ONEWAY" &&
          !this.routeInfos[0].fromCityOrAirport.code) ||
        (this.searchType == "ONEWAY" &&
          !this.routeInfos[0].toCityOrAirport.code)
      ) {
        alert("Slect city.");
        return;
      }
      if (
        (this.searchType == "RETURN" &&
          !this.routeInfos[0].fromCityOrAirport.code) ||
        (this.searchType == "RETURN" &&
          !this.routeInfos[0].toCityOrAirport.code)
      ) {
        alert("Select city.");
        return;
      }
      if (this.searchType == "RETURN") {
        if (!moment(this.toDate).isAfter(this.routeInfos[0].travelDate)) {
          alert("Return date must be feature date.");
        }
      }

      if (this.searchType == "ONEWAY" && !this.routeInfos[0].travelDate) {
        alert("Depart date can not be blank");
        return;
      } else {
        if (
          (this.searchType == "RETURN" && !this.toDate) ||
          (this.searchType == "RETURN" && !this.routeInfos[0].travelDate)
        ) {
          alert("Depart date and Return date can not be blank");
          return;
        } else {
          if (this.searchType == "RETURN") {
            this.routeInfos.push({
              fromCityOrAirport: {
                code: this.routeInfos[0].toCityOrAirport.code
              },
              toCityOrAirport: {
                code: this.routeInfos[0].fromCityOrAirport.code
              },
              travelDate: this.toDate
            });
          }
        }
      }

      this.isPreloader = true;

      await axios
        .post(
          "https://apitest.tripjack.com/fms/v1/air-searchquery-list",
          data,
          auth
        )
        .then(response => {
          this.searchIds = response.data.searchIds;

          setTimeout(() => {
            this.airSearchBySearchId();
            this.expireResults();
          }, 9000);
        })
        .catch(function(error) {
          console.log(error);this.isPreloader = false;
        });
    },
    async airSearchBySearchId() {
      console.log(this.searchIds);
      // axios
      //   .post("https://apitest.tripjack.com/fms/v1/air-search", {searchId: this.searchIds[0]}, auth)
      //   .then(response => console.log(response.data.searchResult))
      //   .catch(function(error) {
      //     console.log(error);
      //   });

      let allONWARD = [],
        onwordFullData = [],
        axiosArray = [],
        allRETURN = [],
        returnFullData = [];

      this.searchIds.forEach(id => {
        let newPromise = axios({
          method: "post",
          url: "https://apitest.tripjack.com/fms/v1/air-search",
          data: { searchId: id },
          headers: { apikey: "711431d46e828a-19de-458f-8519-b601990b6072" }
        });
        axiosArray.push(newPromise);
      });

      await axios
        .all(axiosArray)
        .then(
          axios.spread((...responses) => {
            responses.forEach(res => {
              const searchResult = res.data.searchResult;
              if (searchResult) {
                console.log("**", searchResult.tripInfos);
                allONWARD.push(searchResult.tripInfos.ONWARD);
                if (searchResult.tripInfos.RETURN) {
                  allRETURN.push(searchResult.tripInfos.RETURN);
                }
              }
            });

            allONWARD.forEach(response => {
              console.log("##", response);
              response.filter(res => {
                onwordFullData.push(res);
              });
            });
            ///
            allRETURN.forEach(response => {
              console.log("##", response);
              response.filter(res => {
                returnFullData.push(res);
              });
            });

            this.isPreloader = false;
            //
            console.log("onwordFullData***", onwordFullData);
            console.log("returnFullData***", returnFullData);
            this.onwordFlights = onwordFullData;
            this.returnFlights = returnFullData;

            this.isData = true;
          })
        )
        .catch(error => {
          console.log(error);
          this.isPreloader=false
        });
      //
    },
    expireResults() {
      setTimeout(() => {
        this.showRefreshModal();
      }, 1000 * 900);
    },
    showRefreshModal() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxOk(
          "Tickets price may be changed. Please refresh page to see new results.",
          {
            title: "Search results are expired.",
            size: "sm",
            buttonSize: "sm",
            okTitle: "Refresh results",
            okVariant: "success",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          }
        )
        .then(value => {
          this.boxTwo = value;
          this.searchFlights();
        })
        .catch(err => {
          console(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  margin-left: 10px;
}
.mx-datepicker {
  width: 100%;
}
.twidget-age-group {
  list-style: none;
}
.flights.ONEWAY {
  div {
    width: 70%;
    float: left;
  }
}
.flights.RETURN {
  div {
    width: 50%;
    float: left;
  }
}
</style>