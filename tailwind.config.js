/**
 * Tailwind v4는 디자인 토큰을 src/app/globals.css의 @theme에서 읽습니다.
 * 이 파일은 content 경로 지정 용도로만 유지합니다.
 */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}
