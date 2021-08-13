<template>
  <div class="flights__lists__item__content">
    <div class="__name">
      <FlightDetails :fd="flight.sI[0].fD"></FlightDetails>
    </div>
    <div class="__da">
      <span class="__time">{{timeOfDepart}}</span>
      <AirportDetails :ad="flight.sI[0].da"></AirportDetails>
    </div>

    <div class="__duration">
      <Stops :stops="flight.sI[0]"></Stops>
    </div>

    <div>
      <span class="__time">{{timeOfArrival}}</span>
      <AirportDetails :ad="flight.sI[0].aa"></AirportDetails>
    </div>
    <div>
      <PriceList :price="flight.totalPriceList[0].fd"></PriceList>
    </div>
  </div>
</template>

<script>
import FlightDetails from "@/components/search/FlightDetails";
import AirportDetails from "@/components/search/AirportDetails";
import Stops from "@/components/search/Stops";
import PriceList from "@/components/search/PriceList";
import * as moment from "moment/moment";
export default {
  name: "flightlistitem",
  components: { FlightDetails, AirportDetails, PriceList, Stops },
  props: ["flight"],
  computed: {
    timeOfDepart() {
      return moment(this.flight.sI[0].dt).format("h:mm A");
    },
    timeOfArrival() {
      return moment(this.flight.sI[0].at).format("h:mm A");
    }
  }
};
</script>

<style lang="scss" scoped>
.flights__lists__item__content {
  padding: 15px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: top;
  justify-content: space-between;
  div {
    margin-right: 20px;
  }
  div:last-child {
    margin-right: 0px;
  }
  .__time {
    font-size: 16px;
    font-weight: bold;
  }
  .__da {
    margin-right: 20px;
    text-align: center;
  }
  .__duration {
    text-align: center;
  }
}
</style>