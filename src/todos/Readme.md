# **Todos** - is simple


1) Поиск - любой пользователь
2) Создание - авторизованный пользователь
3) Удаление - авторизованный пользователь
4) Редактирование - авторизованный пользователь
5) Создание списка - авторизованный пользователь
6) Избранное - авторизованный пользователь


## Поиск

1.  Поиск по пользователям

    ```
    [GET] /todos/author/[:author] - author id
    ```
2. Поиск по заголовкам списков   

    ```
    [GET] /todos/title/[:title] - todo title
    ```


##Создание

1.  Создание списка

    ```
    [POST] /todos/[:author]/list   
    body {
        author: id,
        title: string,
        description: string
    }
    ```
2.  Создание задачи

    ```
    [POST] /todos/[:author]/todo   
    body {
        author: id,
        title: string,
        description: string,
        isDone: boolean
    }
    ```


##Удаление

1.  Удаление списка

    ```
    [DELETE] /todos/[:author]/list/[:id] - list id
    ```
2.  Удаление задачи

    ```
    [DELETE] /todos/[:author]/todo/[:id] - todo id
    ```


##Редактирование

1.  Редактирование списка

    ```
    [PUT] /todos/[:author]/list/[:id] - list id   
    body {
        author: id,
        title: string,
        description: string
    }
    ```
2.  Редактирование задачи

    ```
    [PUT] /todos/[:author]/todo/[:id] - todo id   
    body {
        author: id,
        title: string,
        description: string,
        isDone: boolean
    }
    ```