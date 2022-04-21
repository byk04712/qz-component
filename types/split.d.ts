/*
 * @Author: 秦真
 * @Date: 2022-02-18 09:25:47
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-18 15:53:25
 * @Description: Split 组件typescript声明文件
 * @FilePath: \qz-component\types\split.d.ts
 */
import { QzComponent } from './component'

export declare class Split extends QzComponent {
  /**
   * 左侧/上侧 占据空间
   * @default 0.5
   * @type number | string
   */
  value: number | string;
  /**
   * 横向竖向布局
   * @default horizontal
   * @type string
   */
  mode: 'horizontal' | 'vertical';
  /**
   * 横向竖向布局
   * @default 0.54rem
   * @type number | string
   */
  min: number | string;
  /**
   * 横向竖向布局
   * @default 0.54rem
   * @type number | string
   */
  max: number | string;
}
