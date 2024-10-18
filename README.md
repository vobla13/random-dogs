# random-dogs
Реализация тестового задания [Милые песики](https://github.com/StarWayMan/tech_interview_task/blob/main/README.md)
Загрузка на Я.Диск случайной картинки собаки по ее породе. Если порода имеет подпороды, то картинка грузится для каждой подпороды.
- [список пород и документация api dog.ceo](https://dog.ceo/dog-api/documentation/)
- [документация api Я.Диск](https://yandex.ru/dev/disk/poligon/)

## Prerequisites
- Node >= 18
- Авторизация Я.Диск (для загрузки картинок)

## Getting started
- Установить зависимости `npm i`
- Получить [токен авторизации](https://yandex.ru/dev/disk/poligon/) Я.Диска
- Создать файл `.env` и положить в него токен авторизации `YA_DISK_TOKEN=<token>`
- Запустить скрипт `npx ts-node src/index.ts`
