const fb = require('../../fireBaseConfig');

export default {
    namespaced: true,
    state:{
        cart:[],
        products:null,
        product:null,
    },
    actions:{
        clearCart:({ commit})=>{
            localStorage.removeItem('uid');
            commit('UPDATE_CART', [])
        },
        getProducts: ({commit}, products) => {
            commit('UPDATE_PRODUCTS', products)
        },
        getProduct: ({commit}, product) => {
            commit('UPDATE_PRODUCT_DETAILS', product)
        },
        addToCart: ({rootState, commit, state}, item) => {  
            let record = state.cart.find(p => p.id === item.id)
                if (!record) {
                    item.quantity = 1;
                    record = item;
                } else if(item.qtyType == 'minus'){
                    record.quantity--;
                }else if(item.qtyType == 'input'){
                    if(item.quantity =='0'){
                        record.quantity
                    }else{
                        record.quantity = item.quantity
                    }
                }  else {
                    record.quantity++;
                }

            record.userId = rootState.users.currentUser.uid;
            ////
            let tempCart = [];
            fb.cartsCollection.where("userId", "==", rootState.users.currentUser.uid).get().then(docs => {
                docs.forEach(doc => {
                    tempCart.push({ id: doc.id, ...doc.data() });
                });

                const findItem =  tempCart.find(p => p.id === record.id);

                if(!findItem){
                    fb.cartsCollection.add(record).then(() =>{
                        console.log("Added to cart")
                     }).catch(function(error) {
                        console.error("Error adding to cart: ", error);
                    });
                } else{
                        let query = fb.cartsCollection.where('id', '==', item.id).where('userId', '==',  rootState.users.currentUser.uid);
                        query.get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            doc.ref.update({ quantity: record.quantity });
                        });
                     });
                    
                }
            });
            ////
           commit('ADD_ITEM_TO_CART', record);
        },
        removeFromCart: ({rootState, commit}, product) => {
            let query = fb.cartsCollection.where('id', '==', product.id).where('userId', '==',  rootState.users.currentUser.uid);
                query.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
            commit('REMOVE_ITEM_FROM_CART', { id:product.id });
        },
        updateCart:({commit }, items) => {
            commit('UPDATE_CART', items);
        },     
    },
    mutations:{
        UPDATE_PRODUCTS: (state, products) =>{
            state.products = products;
        },
         UPDATE_PRODUCT_DETAILS:(state, product) =>{
            state.product = product;
        },
        UPDATE_CART: (state, items) =>{
                state.cart = items;
        },
        ADD_ITEM_TO_CART: (state, cart) => {
             const record = state.cart.find(p => p.id === cart.id)
             if (!record) {
                state.cart.push(cart);
             }            
        },
        REMOVE_ITEM_FROM_CART: (state, {id}) => {
            const remove = state.cart.filter(p => p.id !==id);
            state.cart = remove;
        },
    },
    getters:{
        getAllProducts: state => state.products,
        getNumberOfProducts: state => (state.products) ? state.products.length : 0,
        cartProducts: state => state.cart,
        cartCount: state => state.cart.length,
        getProductDetails: state => state.product,
        getTotal: state => {
            return state.cart.reduce((total, p) => {
                return total + p.price * p.quantity;
            }, 0);
        }
    }
}