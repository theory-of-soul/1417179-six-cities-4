export const hotelResponseAdapter = (responseOffers) => {
  return responseOffers.map((offer) => {
    const {
      id,
      price,
      rating,
      type,
      title,
      preview_image: previewImage,
      is_favorite: isFavorite,
      city,
      location
    } = offer;

    return {
      id,
      rating,
      type,
      img: previewImage,
      value: price,
      time: `night`,
      isInBookmark: isFavorite,
      name: title,
      city: city.name,
      point: [location.latitude, location.longitude],
      cityLocation: [city.location.latitude, city.location.longitude],
    };
  });
};

