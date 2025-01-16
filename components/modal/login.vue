<template>
  <Dialog
    @update:visible="() => globalStore.showLoginModal(false)"
    :visible="globalStore.isLoginModalOpened"
    modal
    dismissableMask
    header="Авторизация"
    :style="{ width: '20rem' }"
  >
    <div class="form">
      <Form
        v-slot="$form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="form__inner"
      >
        <div class="form__inpus-group">
          <div class="form__item">
            <FloatLabel variant="on">
              <InputText
                name="email"
                autocomplete="off"
                fluid
                id="login-email"
                v-model:model-value="initialValues.email"
              />
              <label for="login-email">Email</label>
            </FloatLabel>
            <Message
              v-if="$form.email?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.email.error.message }}
            </Message>
          </div>
          <div class="form__item">
            <FloatLabel variant="on">
              <Password
                name="password"
                :feedback="false"
                toggleMask
                fluid
                id="login-password"
                v-model="initialValues.password"
              />
              <label for="login-password">Пароль</label>
            </FloatLabel>
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.password.error.message }}
            </Message>
          </div>
        </div>
        <Btn :show-spinner="showBtnSpinner" class="form__btn" type="submit"
          >Войти</Btn
        >
      </Form>
      <button @click="openRegistration" type="button" class="form__outsid-btn">
        Регистрация
      </button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { ILogin } from '@/types/auth';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  
}>()

const globalStore = useGlobalStore();
const authStore = useAuthStore();
const toast = useToast();

const showBtnSpinner = ref(false);
const isSubmitBlocked = ref(false);

const initialValues = ref<ILogin>({
  email: 'email@email.com',
  password: '111111',
});

const formShema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Введите Email' })
    .email({ message: 'Некорректный Email' }),
  password: z
    .string()
    .nonempty({ message: 'Введите пароль' })
    .min(6, { message: 'Не может быть короче 6 символов' }),
});

const resolver = zodResolver(formShema);

async function onFormSubmit(e: FormSubmitEvent) {
  if (!e.valid) return;

  if (!isSubmitBlocked.value) {
    showBtnSpinner.value = true;
    await authStore.fetchLogin(e.values as ILogin);
    showBtnSpinner.value = false;
  }

  if (!authStore.loginError) {
    toast.add({
      severity: 'success',
      summary: 'Успешная авторизация',
      life: 3000,
    });

    globalStore.showLoginModal(false)
  } else if (authStore.loginError && authStore.loginError.status === 401) {
    isSubmitBlocked.value = true;
    toast.add({
      severity: 'error',
      summary: 'Неверный Email или пароль',
      life: 3000,
    });
  } else if (authStore.loginError && authStore.loginError.status === 500) {
    isSubmitBlocked.value = true;
    toast.add({
      severity: 'error',
      summary: 'Ошибка сервера',
      life: 3000,
    });
  }
}

function openRegistration() {
  globalStore.showLoginModal(false);
  globalStore.showRegistrationModal(true);
}

watch(() => initialValues.value, () => isSubmitBlocked.value = false, { deep: true })

</script>

<style scoped lang="scss">
.form {
  display: grid;
  padding-top: 16px;
  &__inner {
    display: grid;
  }
  &__inpus-group {
    display: grid;
    row-gap: 16px;
    margin-bottom: 24px;
  }
  &__item {
    display: grid;
    row-gap: 4px;
  }
  &__btn {
    max-width: max-content;
  }
  &__outsid-btn {
    $padding: 4px;
    position: relative;
    justify-self: flex-end;
    padding: $padding;
    font-size: 14px;
    font-weight: 600;
    color: $secondary;
    @include transition(color);
    &::before {
      position: absolute;
      content: '';
      right: $padding;
      bottom: 0;
      left: $padding;
      border-bottom: 2px solid $primary;
      transform: scaleX(100%);
      @include transition(transform);
    }

    &:focus-visible {
      outline: none;
      color: $primary;
      &::before {
        transform: scale(0);
      }
    }

    @media #{$md-screen} {
      &:hover {
        outline: none;
        color: $primary;
        &::before {
          transform: scale(0);
        }
      }
    }
  }
}
</style>


{
  "originalEvent": {
      "isTrusted": true,
      "_vts": 1736979373752
  },
  "valid": true,
  "states": {
      "email": {
          "value": "email@email.com",
          "touched": false,
          "dirty": false,
          "pristine": true,
          "valid": true,
          "invalid": false,
          "error": null,
          "errors": []
      },
      "password": {
          "value": "111111sdf",
          "touched": true,
          "dirty": true,
          "pristine": false,
          "valid": true,
          "invalid": false,
          "error": null,
          "errors": []
      }
  },
  "values": {
      "email": "email@email.com",
      "password": "111111sdf"
  },
  "errors": {}
}
