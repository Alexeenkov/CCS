# Верстка страницы оформления заказа (Center of Corporate Solution)

Сборка проекта осуществляется при установленных версиях **node 10.19.0** и **npm 6.13.4**

Установить их можно с помощью команды в терминале (при установленном nvm):

`$ nvm i 10.19.0`

## При тестировании

Точки между пунктами оформления заказа подключаются с помощью JS файла. Реализовано так с целью максимальной адаптации при изменении количества данных пунктов. При тестировании через devtools в браузере после добавления/удаления пунктов оформления заказа, необходимо изменить ширину экрана хотя бы на 1px, чтобы заного перезапустился скрипт, изменяющий количество точек в соответствии с размерами и количеством пунктов.