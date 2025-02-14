<template>
  <Dialog
    :visible="authStore.isRegistrationModalOpened"
    modal
    dismissable-mask
    header="Регистрация"
    :style="{ width: '20rem' }"
    @update:visible="authStore.showRegistrationModal(false)"
  >
    <div class="form">
      <Form
        v-slot="$form"
        :initial-values
        :resolver
        class="form__inner"
        @submit="onFormSubmit"
      >
        <div class="form__inpus-group">
          <div class="form__item">
            <FloatLabel variant="on">
              <InputText
                id="login-email"
                v-model:model-value="initialValues.email"
                name="email"
                class=""
                autocomplete="off"
                fluid
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
                id="login-password"
                v-model:model-value="initialValues.password"
                name="password"
                :feedback="false"
                toggle-mask
                fluid
                :input-props="{ autocomplete: 'new-password' }"
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
          <div class="form__item">
            <FloatLabel variant="on">
              <Password
                id="login-password-cinfirm"
                v-model:model-value="initialValues.passwordConfirm"
                name="passwordConfirm"
                :feedback="false"
                toggle-mask
                fluid
                autocomplete="on"
                :input-props="{ autocomplete: 'new-password' }"
              />
              <label for="login-password-cinfirm">Подтвердите пароль</label>
            </FloatLabel>

            <Message
              v-if="$form.passwordConfirm?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.passwordConfirm.error.message }}
            </Message>
          </div>
        </div>

        <Btn
          :show-spinner="showBtnSpinner"
          class="form__btn"
          type="submit"
        >
          Зарегестрироваться
        </Btn>
      </Form>
      <button
        type="button"
        class="form__outsid-btn"
        @click="openLogin"
      >
        Авторизация
      </button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import type { IRegistration } from '@/types/auth'

const authStore = useAuthStore()
const toast = useToast()

const showBtnSpinner = ref(false)
const isSubmitBlocked = ref(false)

const initialValues = ref<IRegistration>({
  email: '',
  password: '',
  passwordConfirm: '',
})

const resolver = zodResolver(
  z
    .object({
      email: z
        .string()
        .min(1, { message: 'Введите Email' })
        .email({ message: 'Некорректный Email' }),
      password: z
        .string()
        .min(1, { message: 'Введите пароль' })
        .min(6, { message: 'Не может быть короче 6 символов' }),
      passwordConfirm: z.string().min(1, { message: 'Подтвердите пароль' }),
    })
    .superRefine(({ passwordConfirm, password }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Пароли должны совпадать',
          path: ['passwordConfirm'],
        })
      }
    }),
)

async function onFormSubmit(e: FormSubmitEvent) {
  if (!e.valid) return

  if (!isSubmitBlocked.value) {
    showBtnSpinner.value = true
    await authStore.fetchRegistration(e.values as IRegistration)
    showBtnSpinner.value = false
  }

  if (!authStore.registrationError) {
    toast.add({
      severity: 'success',
      summary: 'Успешная регистрация',
      life: 1000,
    })
    openLogin()

    initialValues.value = {
      email: '',
      password: '',
      passwordConfirm: '',
    }
  }
  else if (
    authStore.registrationError
    && authStore.registrationError.status === 409
  ) {
    isSubmitBlocked.value = true
    toast.add({
      severity: 'error',
      summary: 'Пользователь уже существует',
      life: 1000,
    })
  }
  else if (authStore.loginError && authStore.loginError.status === 500) {
    isSubmitBlocked.value = true
    toast.add({
      severity: 'error',
      summary: 'Ошибка сервера',
      life: 1000,
    })
  }
}

function openLogin() {
  authStore.showRegistrationModal(false)
  authStore.showLoginModal(true)
}

watch(
  () => initialValues.value,
  () => (isSubmitBlocked.value = false),
  { deep: true },
)
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
    margin-bottom: 8px;
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

    @media #{$xl-screen} {
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
