export default {
    namespaced: true,
    state:{
        cart:[],
        products:null,
        product:null
    },
    actions:{
        getProducts: ({commit}, products) => {
            commit('UPDATE_PRODUCTS', products)
        },
        getProduct: ({commit}, product) => {
            commit('UPDATE_PRODUCT_DETAILS', product)
        },
        addToCart: ({commit}, product) => {
           // const cart = [...state.cart, product];
           commit('ADD_ITEM_TO_CART', {id: product.id, qtyType:product.qtyType, qty:product.quantity});
        },
        removeFromCart: ({commit}, product) => {
            commit('REMOVE_ITEM_FROM_CART', { id:product.id });
        }
    },
    mutations:{
        UPDATE_PRODUCTS: (state, products) =>{
            state.products = products;
        },
        UPDATE_PRODUCT_DETAILS:(state, product) =>{
            state.product = product;
        },
        ADD_ITEM_TO_CART: (state, {id, qtyType, qty}) => {
            const record = state.cart.find(p => p.id === id)
            if (!record) {
                state.cart.push({ id,quantity: 1 })
              } else if(qtyType == 'minus'){
                record.quantity--;
              }else if(qtyType == 'input'){
                  if(qty =='0'){
                    record.quantity
                  }else{
                    record.quantity = qty
                  }
              }  else {
                record.quantity++;
              }
        },
        REMOVE_ITEM_FROM_CART: (state, {id}) => {
            const remove = state.cart.filter(p => p.id !==id);
            state.cart = remove;
        }
    },
    getters:{
        getAllProducts: state => state.products,
        getNumberOfProducts: state => (state.products) ? state.products.length : 0,
        cartProducts: state => {
            return state.cart.map(({ id, quantity }) => {
                const product = state.products.find(p => p.id === id)    
                return {
                    id:product.id,
                    name: product.name,
                    price: product.price,
                    quantity
                }
            });
        },
        cartCount: state => state.cart.length,
        getProductDetails: state => state.product
    }
}