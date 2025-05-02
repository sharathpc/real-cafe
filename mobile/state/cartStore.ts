import {create} from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import { mmkvStorage } from './storage';
import { cartItem, Product } from '@/models';


interface cartStore {
    cart : cartItem[];
    addItem : (item : Product) =>void;
    removeItem:(id : string | number) =>void;
    clearCart : () => void;
    getItemCount : (id : string | number) => number;
    getTotalPrice : ()=> number;
    getTotalItemsCount : () => number;
}

export const useCartStore = create<cartStore>()(
    persist(
        (set,get)=>({
            cart : [],
            addItem :(item) =>{
                const currentCart = get().cart
                console.log("IN add item card",currentCart,item)
                const existingItemIndex = currentCart.findIndex((cartItem : any) => cartItem?._id === item._id)
                if(existingItemIndex >= 0){
                    const updatedCart = [...currentCart]
                    updatedCart[existingItemIndex] = {
                        ...updatedCart[existingItemIndex],
                        count : updatedCart[existingItemIndex].count + 1
                    }
                    console.log("UPdated cart",updatedCart)
                    set({cart : updatedCart})
                }
                else{
                    set({
                        cart : [...currentCart,{_id : item._id, item : item,count : 1}]
                    })
                    
                }
            },
            removeItem : (id) =>{
                const currentCart = get().cart
                const existingItemIndex = currentCart.findIndex((cartItem : any) => cartItem?._id === id)
                if(existingItemIndex >= 0){
                    const updatedCart = [...currentCart]
                    const existingItem = updatedCart[existingItemIndex]

                    if(existingItem.count > 1){
                        updatedCart[existingItemIndex] ={
                            ...existingItem,
                            count : existingItem?.count -1
                        }
                    }
                    else{
                        updatedCart.splice(existingItemIndex,1)
                    }
                    set({cart : updatedCart})
                }
            },
            clearCart:() =>{set({cart : []})},
            getItemCount : (id)=>{
                const currentItem = get().cart.find(cartItem => cartItem._id === id)
                return currentItem ? currentItem.count : 0
            },
            getTotalPrice : ()=>{
                return get().cart.reduce((total,cartItem) => total+ cartItem.item.price * cartItem.count,0)
            },
            getTotalItemsCount : () =>{
                return get().cart.reduce((acc,cart) => acc + cart.count,0)
            }

        }),
        {
            name :'cart-storage',
            storage:createJSONStorage(()=> mmkvStorage)
        }
    ),
)