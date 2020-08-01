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
      is_premium: isPremium,
      city,
      location,
      images,
      goods,
      description,
      host: {
        avatar_url: icon,
        id: hostId,
        is_pro: isPro,
        name: hostName,
      },
      bedrooms,
      max_adults: guests
    } = offer;

    return {
      id,
      rating: Math.round(rating),
      type,
      images,
      goods,
      description,
      isPremium,
      bedrooms,
      guests,
      host: {
        icon: `/${icon}`,
        hostId,
        isSuper: isPro,
        name: hostName
      },
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

