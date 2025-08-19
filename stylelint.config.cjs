/** stylelint.config.cjs (สำหรับ Stylelint v16) */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',    // ตัดกฎสไตล์ที่ Prettier จัดการให้แล้ว
  ],
  plugins: [
    'stylelint-order',              // ใช้ได้ถ้าต้องการจัดลำดับ properties
  ],
  rules: {
    // ปิดกฎที่ชอบเตือนเรื่อง 1 บรรทัดหลายประกาศ ฯลฯ เพราะเราใช้ Prettier แทน
    'declaration-block-single-line-max-declarations': null,

    // ถ้าไม่อยากให้เตือนลำดับ property (เช่น margin ก่อน padding) ให้ปิดกฎนี้
    // 'order/properties-order': null,
  },
  ignoreFiles: [
    '**/*.md', '**/*.mdx',
    'node_modules/**', '.next/**', 'dist/**', 'out/**'
  ],
};
