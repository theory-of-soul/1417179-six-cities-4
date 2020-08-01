export const userResponseAdapter = (response) => ({
  avatar: response.avatar_url,
  email: response.email,
  id: response.id,
  isPro: response.is_pro
});
