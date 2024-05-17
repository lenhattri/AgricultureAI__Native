# INTRODUCE
- Đây là một dự án xây dựng một base chatbot


# INSTALLATION

Install dependencies:
```bash
npm install
```
Create .env.local
```bash
cp .env.example .env.local
//and change content with your api key
```

Run react server :
```bash
npm run android
```




# LIBRARIES

**Native development:** React Native

**Build tool:** Babel

**Coding Style:** ESlint(Will update in another path)



# CONVENTION CODE

- Khi cần viết 1 components, không đặt thẳng tên như Button.jsx, thay vào đó định nghĩa components sẽ định nghĩa folder trước, sau đó bên trong định nghĩa file index.jsx là file viết component, ví dụ Button/index.jsx
  

  
- Cố gắng sử dụng các components đã có sẵn của thư viện Magnus UI, không viết lại các components đã có
  
- Cố gắng sử dụng css của Magnus UI
  
- Sử dụng `ESlint` để format code 1 chuẩn chung. [**Tải ESlint trong vscode extensions**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  
- Component nên cố gắng chia nhỏ, không để component quá to
  
- Viết custom hooks nhiều nhất có thể, tách logic ra khỏi UI, ở components gọi hook, hook sẽ xử lý logic của business
  
