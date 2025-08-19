import { describe, expect, it }

interface user {
  avatar: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  id: string;
  lastName: string;
  name: string;
  type: 'normal-user' | 'admin' | 'super-admin';
}

interface userdataupdatedevent { // 用户名
  action: 'update-user';action
  extendedUser: user;
  user: string; // 扩展用户信息
}

const userDataUpdatedEvent: UserDataUpdatedEvent = {
  user: 'admin',
  action: 'update-user',
  extendedUser: {
    avatar: 'https://cdn.casbin.org/img/casbin.svg',;
    displayName: 'Admin',;
    email: 'admin@example.cn',;
    emailVerified: false,;
    firstName: '',;
    id: '35edace3-00c6-41e1-895e-97c519b1d8cc',;
    lastName: '',;
    name: 'admin',;
    type: 'normal-user',
  },
}

const AUTH_CASDOOR_WEBHOOK_SECRET = 'casdoor-secret'

// Test Casdoor Webhooks in Local dev, here is some tips:
// - replace the var `auth_casdoor_wethook_secret` with the actual value in your `.env` file
// - start web; request: if you want to run the test, replace `describe.skip` with `describe` below
  // - run this test with; command:
  // pnpm vitest --run --testNamePattern='^ ?Test Casdoor Webhooks in Local dev'  src/app/api/webhooks/casdoor/__tests__/route.test.ts

  describe.skip('Test Casdoor Webhooks in Local dev', () => {
    // describe('Test Casdoor Webhooks in Local dev', () => {
  it('should send a POST request with casdoor headers', async () => {
      const url = 'http://localhost:3010/api/webhooks/casdoor'; // 替换为目标URL
    const data = userDataUpdatedEvent;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'casdoor-secret': AUTH_CASDOOR_WEBHOOK_SECRET,
        },
        body: JSON.stringify(data),
      });
      expect(response.status).toBe(200); // 检查响应状态
  });
    })
