export default {
    namespaced: true,
    state:{
        cart:[],
        products:[
            {
              id: '1',
              name: 'COBOL 101 vintage',
              description: 'Learn COBOL with this vintage programming book',
              price: 399
            },
            {
              id: '2',
              name: 'Sharp C2719 curved TV',
              description: 'Watch TV like never before with the brand new curved screen technology',
              price: 1995
            },
            {
              id: '3',
              name: 'Remmington X mechanical keyboard',
              description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
                'features tactile, clicky switches for speed and accuracy',
              price: 595
            },
            {
                id: '4',
                name: 'COBOL 101 vintage',
                description: 'Learn COBOL with this vintage programming book',
                price: 399
              },
              {
                id: '5',
                name: 'Sharp C2719 curved TV',
                description: 'Watch TV like never before with the brand new curved screen technology',
                price: 1995
              },
              {
                id: '6',
                name: 'Remmington X mechanical keyboard',
                description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
                  'features tactile, clicky switches for speed and accuracy',
                price: 595
              }
          ]
    },
    actions:{
        getProducts: ({commit}) => {
            const products ='';
            commit('UPDATE_PRODUCTS', products)
        },
        addToCart: ({commit}, product) => {
           // const cart = [...state.cart, product];
           commit('ADD_TO_CART', {id: product.id});
        }
    },
    mutations:{
        UPDATE_PRODUCTS: (state, products) =>{
            state.products = products;
        },
        ADD_TO_CART: (state, {id}) => {
            const record = state.cart.find(p => p.id === id)
            if (!record) {
                state.cart.push({
                  id,
                  quantity: 1
                })
              } else {
                record.quantity++
              }
        },
    },
    getters:{
        allProducts: state => state.products,
        getNumberOfProducts: state => (state.products) ? state.products.length : 0,
        cartProducts: state => {
            return state.cart.map(({ id, quantity }) => {
                const product = state.products.find(p => p.id === id)    
                return {
                    name: product.name,
                    price: product.price,
                    quantity
                }
            });
        },
        cartCount: state => state.cart.length,
    }
}