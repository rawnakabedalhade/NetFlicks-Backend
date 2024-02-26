const normalizeUser = (user) => {
  let image = {};
  image = {
    ...user.image,
    url:
      user.image.url ||
      "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    alt: user.image.alt || "default image",
  };
  if (user.image.alt && !user.image.url) {
    image = {
      url: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
      alt: "default image",
    };
  }
  return {
    ...user,
    name: { ...user.name, middle: user.name.middle || undefined },
    image,
    address: {
      ...user.address,
      state: user.address.state || undefined,
    },
  };
};
export default normalizeUser;
