declare module '*.css' {
  /** CSS クラスを参照するためのオブジェクトです。 */
  const styles: { [className: string]: string }
  export default styles
}
