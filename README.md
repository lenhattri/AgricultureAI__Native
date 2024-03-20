# INSTALLATION

Install dependencies:
```bash
npm install
```


Run react server :
```bash
npm run dev
```
# LIBRARIES

**Native development:** React Native

**Build tool:** Babel

**Coding Style:** ESlint(Will update in another path)



# CONVENTION CODE

- Khi cần viết 1 components, không đặt thẳng tên như Button.jsx, thay vào đó định nghĩa components sẽ định nghĩa folder trước, sau đó bên trong định nghĩa file [tên].jsx là file viết component, ví dụ Button/Button.jsx
  

  
- Cố gắng sử dụng các components đã có sẵn của thư viện Magnus UI, không viết lại các components đã có
  
- Cố gắng sử dụng css của Magnus UI
  
- Sử dụng `ESlint` để format code 1 chuẩn chung. [**Tải ESlint trong vscode extensions**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  
- Component nên cố gắng chia nhỏ, không để component quá to
  
- Sử dụng thư viện `react-query` để request API, không sử dụng trực tiếp axios
  
- Sử dụng `zustand` để quản lý global state, không sử dụng redux, không sử dụng context
  
- Đối với server state sử dụng `react-query` để cache, không lưu local state
  
- Sử dụng `react-hook-form` để quản lý form, không tự viết quản lý form
  
- Sử dụng `date-fns` để xử lý các vấn đề về thời gian, không tự viết phần thời gian
  
- Cố gắng sử dụng lodash, hạn chế tự viết (Link [lodash](https://lodash.com/))

- Viết custom hooks nhiều nhất có thể, tách logic ra khỏi UI, ở components gọi hook, hook sẽ xử lý logic của business
  
