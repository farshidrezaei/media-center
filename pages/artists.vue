<template>
  <v-list two-line>
    <template v-for="(item, index) in items.data">
      <v-list-item :key="item.first_name + ' ' + item.last_name">
        <v-list-item-avatar @click="$router.push('artist')">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            @click="$router.push('artist')"
            v-html="item.first_name + ' ' + item.last_name"
          ></v-list-item-title>
          <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
        </v-list-item-content>
        <v-btn outlined x-small @click="" color="primary">Follow</v-btn>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  layout: 'app',

  async asyncData({ $axios }) {
    return {
      items: await $axios
        .$get('https://reqres.in/api/users?page=2')
        .catch((e) => console.log(e))
    }
  }
}
</script>
