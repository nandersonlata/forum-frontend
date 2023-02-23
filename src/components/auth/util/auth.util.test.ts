import { isLoggedIn } from './auth.util';

describe('auth util', () => {
  describe('isLoggedIn', () => {
    it('should return false if no token exists in sessionStorage', () => {
      expect(isLoggedIn()).toBeFalsy();
    });

    it('should return false if accessToken is expired', () => {
      sessionStorage.setItem(
        'access_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk5OTksImVtYWlsIjoiZmFrZUVtYWlsQG15RW1haWwuY29tIiwiaWF0IjoxNjc3MTc4MDE1LCJleHAiOjE2NzcxNzg5MTV9.jT49b3IA0mZGTM-TN5C8I6q_9BdLcUUI32SsfB5exnY',
      );
      expect(isLoggedIn()).toBeFalsy();
    });

    it('should return tue if accessToken is not expired', () => {
      // the token used in this test expires in the year 2286
      sessionStorage.setItem(
        'access_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk5OTksImVtYWlsIjoiZmFrZUVtYWlsQG15RW1haWwuY29tIiwiaWF0IjoxNjc3MTc4MDE1LCJleHAiOjk5OTk5OTk5OTl9.hayAd1AoRvOkJnbwzG2-ItXD6grhah_z8XdkIQeakdM',
      );
      expect(isLoggedIn()).toBeTruthy();
    });
  });
});
