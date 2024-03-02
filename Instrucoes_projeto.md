# Instruções do Projeto

! Deixarei exemplo de codigo !

### Estrutura do Projeto
- pages -- Ira corresponder aos URL's
    - api -- ( Onde ficam todos os **EndPoints** da APP )

- app
    - components -- ( Componentes da APP )

- src
    - data -- ( Onde fica **todas as funções** que se comunicam com a **Base de Dados** )

        - mongodb.js -- ( Neste ficheiro fazemos 2 funções "ConnectToMongo()" e "connectToCollection" )

        - users.js -- ( Neste ficheiro iremos chamar a função "ConnectToCollection" e criamos uma variavel constante que irá guardar o nome da coleção dos users. Tendo agora acesso a coleção podemos usar as funçoes find, findOne, etc...)

    - servicos -- ( Onde fica toda a logica do BackEnd onde é feito todos os processos antes de enviar para o FrontEnd )

        - users.js -- ( Neste ficheiro iremos chamar as funções que se ligam a **Base de Dados - data/users** )



#### Funçoes data/Mongodb.js
```
    ConnectToMongo() - Irá criar o cliente do Mongo:
    Ex:. 
        client = new MongoClient(url, { useUnifiedTopology: true });
                await client.connect();
                return client


    ConnectToCollection(collectionName) _ Irá usar o client para se ligar a uma coleção do mongo
    Ex:. 
        const client = await connectToCollection();
        const db = client.db(dbName);
        return db.collection(collectionName);
```

#### Funçoes data/users
```
    FindUsers() - Irá buscar todos os users da colecao "users" e retorna o array deles
    Ex:. 
        const collection = await ConnectToCollection(collectionName);
        return await collection.find().toArray()

    FindUserByID() - Irá buscar 1 user pelo ID na colecao "users" 
    Ex:. 
        const collection = await ConnectToCollection(collectionName);
        return await collection.findOne({ _id: new ObjectId(uid) })
```

#### Funçoes services/users
```
    GetUser(id) - Irá buscar o user com o id correspondente
    Ex:.
        return await FindUserById(uid);

    GetUsers() - Irá buscar todos os users da base de dados
    Ex:.
        return await FindUsers();
```