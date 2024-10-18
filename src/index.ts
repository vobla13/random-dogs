import { checkBreedExist, getBreedImagesUrls, uploadToDiskFromUrls } from "./utils.js";

async function uploadBreedImages(breed: string) {
  const isBreedExist = await checkBreedExist(breed);

  if (!isBreedExist) return;

  const images = await getBreedImagesUrls(breed);
  await uploadToDiskFromUrls(breed, images);
}

const breed = "mastiff";
await uploadBreedImages(breed);
