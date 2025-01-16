import { useAuthStore } from '~/stores/authStore';
import type {
  IAddedProductToBasket,
  IBasketProduct,
  IBasketConfig,
} from '@/types/basket';
import { BASKET_ADD_URL } from '@/config/api';

export const useBasketStore = defineStore('basketStore', () => {
  const authStore = useAuthStore();
  const basketListCookie = useCookie('basket')
  const basketList = shallowRef<IBasketProduct[]>([]);
  const config = shallowRef<IBasketConfig | null>(null);
  const totalAmount = ref<number>(0);

  async function fetchAddProduct({
    productId,
    sizeId,
    amount,
  }: IAddedProductToBasket) {
    if (!authStore.token) {
      addProductToBasketCookie({
        productId,
        sizeId,
        amount,
      });
      return;
    }
    try {
      const res = await $fetch<{ totalCartAmount: number }>(BASKET_ADD_URL, {
        method: 'POST',
        body: { productId, sizeId, amount },
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  function addProductToBasketCookie(product: IAddedProductToBasket): void {
    const LSBasket: IAddedProductToBasket[] = getBasketProductFromLS();
    const index = LSBasket.findIndex(
      (item) => item.productId === product.productId
    );
    if (index === -1) {
      LSBasket.push(product);
    } else {
      LSBasket[index].amount += product.amount;
    }
    localStorage.setItem('temporaryBasket', JSON.stringify(LSBasket));
  
  }

  function getBasketProductFromLS(): IAddedProductToBasket[] {
    const basket = localStorage.getItem('temporaryBasket')
    if (!basket) return [];
    return JSON.parse(basket);
  }

  function setTotalAmount(amount: number) {
    totalAmount.value = amount;
  }

  return {
    totalAmount,
    setTotalAmount,
    fetchAddProduct,
  };
});
