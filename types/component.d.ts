import Vue from 'vue'

/** QzComponent component common definition */
export declare class QzComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type QzComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type QzComponentHorizontalAlignment = 'left' | 'center' | 'right'
