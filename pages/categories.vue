<template>
  <v-list dense>
    <v-list-group
      v-for="item in items"
      :key="item.title"
      v-model="item.active"
      :prepend-icon="'mdi-' + item.action"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item v-for="subItem in item.items" :key="subItem.title">
        <v-list-item-content>
          <v-list-item-title v-text="subItem.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  layout: 'app',

  data() {
    return {
      items: [
        {
          action: 'music',
          title: 'Musics',
          items: [{ title: 'List Item' }]
        },
        {
          action: 'disc',
          title: 'Albums',
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' }
          ]
        },
        {
          action: 'video',
          title: 'Music Videos',
          items: [{ title: 'List Item' }]
        },
        {
          action: 'movie',
          title: 'Movies',
          items: [{ title: 'List Item' }]
        }
      ]
    }
  }
}
</script>
