<template>
  <footer class="footer">
    <Container
      class="footer__inner"
      type="box"
    >
      <div class="footer__links footer__links--contacts">
        <TheFooterLinks :link-list="linkContacts" />
      </div>
      <div class="footer__links footer__links--data">
        <TheFooterLinks :link-list="linkData" />
      </div>
      <div class="footer__social">
        <TheFooterSocial :link-list="linkSocial" />
      </div>
      <div class="footer__copyright">
        <TheFooterCopyright />
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
const linkContacts = [
  { name: '8 999 999 99 99', href: 'tel:89999999999' },
  { name: 'mountain-bikes@bike.com', href: 'mailto:mountain-bikes@bike.com' },
  { name: 'Распродажа', href: '#' },
  { name: 'Заказать звонок', href: '#' },
]

const linkData = [
  { name: 'Политика конфиденциальности', href: '#' },
  { name: 'Публичная оферта', href: '#' },
]

const linkSocial = [
  { name: 'Телеграм', href: '#', iconName: 'telegram' },
  { name: 'Инстаграм', href: '#', iconName: 'instagram' },
  { name: 'Ютюб', href: '#', iconName: 'youtube' },
]
</script>

<style scoped lang="scss">
.footer {
  padding-block: 24px;
  background-color: $secondary;
  color: white;
  &__inner {
    display: grid;
    gap: 16px;
    grid-template-areas:
    'contacts'
    'data'
    'social'
    'copyright'
    ;
    @media #{$lg-screen} {
      grid-template-areas:
      'contacts . data'
      'social social social'
      'copyright copyright copyright'
      ;
      grid-template-columns: auto 1fr auto;
      gap: 0;
    }
  }
  &__links {
    &--contacts {
     grid-area: contacts;
    }
    &--data {
      grid-area: data;
    }
  }
  &__social {
    grid-area: social;
    justify-self: center;
  }
  &__copyright {
    grid-area: copyright;
    justify-self: flex-end;
  }
}
</style>
