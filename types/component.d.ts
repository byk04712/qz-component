import Vue from 'vue'

/** BgyComponent component common definition */
export declare class BgyComponentComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type BgyComponentComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type BgyComponentHorizontalAlignment = 'left' | 'center' | 'right'
