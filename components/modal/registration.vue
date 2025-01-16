<template>
  <Dialog
    @update:visible="globalStore.showRegistrationModal(false)"
    :visible="globalStore.isRegistrationModalOpened"
    modal
    dismissableMask
    header="Регистрация"
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
                class=""
                autocomplete="off"
                fluid
                id="login-email"
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
                name="passwordConfirm"
                :feedback="false"
                toggleMask
                fluid
                id="login-password-cinfirm"
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

        <Btn class="form__btn" type="submit">Регистрация</Btn>
      </Form>
      <button @click="openLogin" type="button" class="form__outsid-btn">Авторизация</button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { IRegistration } from '@/types/auth';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const toast = useToast();

const initialValues = ref<IRegistration>({
  email: 'email@email.com',
  password: '111111',
  passwordConfirm: '',
});

const resolver = zodResolver(
  z
    .object({
      email: z.string().min(1, { message: 'Введите Email' })
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
        });
      }
    })
);

async function onFormSubmit(e: FormSubmitEvent) {

  if (!e.valid) return;
  await authStore.fetchRegistration(e.values as IRegistration);
  globalStore.showRegistrationModal(false);

  if (e.valid) {
    toast.add({
      severity: 'success',
      summary: 'Успешная регистрация',
      life: 3000,
    });
  }
}

function openLogin() {
  globalStore.showRegistrationModal(false);
  globalStore.showLoginModal(true);
}
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
