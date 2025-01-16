import { CHECK_AUTH_URL, LOGIN_URL, REGISTRATION_URL } from '@/config/api';
import type { IUser, ILogin, IRegistration, IAuthError } from '@/types/auth';
import { isIAuthError } from '@/types/auth';

export const useAuthStore = defineStore('authStore', () => {
  const basketStore = useBasketStore();

  const token = useCookie('token')

  const isFirstEnter = ref(true);
  const loginError = shallowRef<IAuthError | null>(null);
  const registrationError = shallowRef<IAuthError | null>(null);

  function setFirstEnter() {
    isFirstEnter.value = false;
  }

  function setAuthError(err: unknown, errorObj: Ref<IAuthError | null>) {
    if (isIAuthError(err)) {
      errorObj.value = err;
    } else {
      errorObj.value = {
        status: 500,
        data: 'Unknow error',
      };
    }
  }

  async function fetchLogin({ email, password }: ILogin) {
    loginError.value = null;
    try {
      const res = await $fetch<IUser>(LOGIN_URL, {
        method: 'POST',
        body: {
          email,
          password,
        },
      });
      token.value = res.token;
    } catch (err: unknown) {
      setAuthError(err, loginError);
      console.error(err);
    }
  }

  function logout() {
    token.value = '';
    basketStore.setTotalAmount(0);
  }

  async function fetchCheckAuth() {
    if (!token.value) {
      return;
    }
    try {
      const res = await $fetch<IUser>(CHECK_AUTH_URL, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      token.value = res.token;
      basketStore.setTotalAmount(res.cartAmount);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchRegistration({
    email,
    password,
    passwordConfirm,
  }: IRegistration) {
    registrationError.value = null;
    try {
      $fetch(REGISTRATION_URL, {
        body: {
          email,
          password,
          passwordConfirm,
        },
      });
    } catch (err) {
      setAuthError(err, registrationError);
      console.error(err);
    }
  }

  return {
    token,
    setFirstEnter,
    isFirstEnter,
    fetchCheckAuth,
    fetchLogin,
    logout,
    fetchRegistration,
    loginError,
    registrationError,
  };
});
