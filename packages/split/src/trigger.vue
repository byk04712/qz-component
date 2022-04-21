<!--
 * @Author: 秦真
 * @Date: 2021-11-11 09:14:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-11 11:01:59
 * @Description: 
 * @FilePath: \admin-fronted\src\components\split\trigger.vue
-->
<template>
  <div :class="classes">
    <div :class="barConClasses">
      <a-icon
        :type="type"
        :title="isExpand ? '收起' : '展开'"
        style="font-size:8px;"
        @click.stop="handleClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Trigger',

  props: {
    mode: String
  },

  data() {
    return {
      prefix: 'qz-split-trigger',
      initOffset: 0,
      isExpand: true,
    };
  },

  computed: {
    type() {
      if (this.isVertical) {
        return this.isExpand ? 'left' : 'right'
      }
      return this.isExpand ? 'up' : 'down'
    },
    
    isVertical() {
      return this.mode === 'vertical';
    },

    classes() {
      return [
        this.prefix,
        this.isVertical ? `${this.prefix}-vertical` : `${this.prefix}-horizontal`
      ];
    },

    barConClasses() {
      return [
        `${this.prefix}-bar-con`,
        this.isVertical ? 'vertical' : 'horizontal'
      ];
    }
  },

  methods: {
    handleClick() {
      this.isExpand = !this.isExpand;
      this.$emit('toggleExpand', this.isExpand);
    }
  }
};
</script>