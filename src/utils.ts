import { YaDiskClient, DogCeoClient } from "./api-clients.js";

import type { FileToUpload } from "./types.js";

export async function checkBreedExist(breed: string) {
  const dogs = new DogCeoClient();

  try {
    const subBreeds = await dogs.getSubBreeds(breed);
    return Array.isArray(subBreeds);
  } catch (error) {
    console.log("Breed does not exist, try another one");
  }
}

export async function getBreedImagesUrls(breed: string) {
  const dogs = new DogCeoClient();

  const subBreeds = await dogs.getSubBreeds(breed);
  const hasSubBreeds = subBreeds.length > 0;

  const imagesToUpload = [];

  if (hasSubBreeds) {
    for (const subBreed of subBreeds) {
      const subBreedImage = await dogs.getRandomImageUrl(breed, subBreed);
      imagesToUpload.push(subBreedImage);
    }
  } else {
    const breedImage = await dogs.getRandomImageUrl(breed);
    imagesToUpload.push(breedImage);
  }

  return imagesToUpload;
}

export async function uploadToDiskFromUrls(folderName: string, urls: string[]) {
  const disk = new YaDiskClient();

  await disk.createFolder(folderName);

  for (const url of urls) {
    const file: FileToUpload = {
      path: folderName,
      name: url.split("/").pop() || Date.now().toString(),
      source: url,
    };

    await disk.uploadFile(file);
  }
}
