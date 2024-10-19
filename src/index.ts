import { YaDiskClient, DogCeoClient } from "./api-clients.js";
import { checkBreedExist, getBreedImagesUrls, uploadToDiskFromUrls } from "./utils.js";

const dogsApi = new DogCeoClient();
const diskApi = new YaDiskClient();

async function uploadBreedImages(breed: string) {
  const isBreedExist = await checkBreedExist(breed, dogsApi);

  if (!isBreedExist) return;

  const images = await getBreedImagesUrls(breed, dogsApi);
  await uploadToDiskFromUrls(breed, images, diskApi);
}

const breed = "mastiff";
await uploadBreedImages(breed);
