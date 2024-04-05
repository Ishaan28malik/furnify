export const getInitial = (name: string) => {
  const nameParts = name.split(' ');

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0);
  }

  return nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
};

export const getRandomImageUrl = () => {
  const imageUrls = [
    require('../../assets/images/profileImages/pf-1.jpg'),
    require('../../assets/images/profileImages/pf-2.jpg'),
    require('../../assets/images/profileImages/pf-3.jpg'),
    require('../../assets/images/profileImages/pf-4.jpg'),
    require('../../assets/images/profileImages/pf-5.jpg'),
  ];

  const randomIndex = Math.floor(Math.random() * imageUrls.length);

  return imageUrls[randomIndex];
};

export const getCurrentTime = () => {
  let currentTime = new Date();

  let hours = currentTime.getHours();
  let minutes: number | string = currentTime.getMinutes();

  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? '0' + minutes : minutes;

  let timeString = hours + ':' + minutes + ' ' + ampm;

  return timeString;
};
