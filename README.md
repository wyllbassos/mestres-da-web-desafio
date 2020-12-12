# mestres_da_web_desafio

# Installation and Run de Project
  1. Clone this repository
  2. Enter the project folder and run the 'yarn' command
  3. Run the 'yarn typeorm migrations:run' command
  3. Run the 'yarn dev:server' command

# Using Insomnia
  1. Open the insominia and import the workspace file that is in the project's root folder
  2. Create a user: { name, email, password }
  3. Create a session: { email, password }
  4. Copy the token that was returned when creating the session
  5. Enter manage environment
  6. Replace the existing token with the copied one
  7. Create Categories: { code, description }
    7.1 The code field need have a 4 chars.
    7.2 The description is required
    7.3 Exemple: footwear, pants, Shirts...
  8. Create Colors: { code, description }
    8.1 The code field need have a 4 chars.
    8.2 The description is required
  9. Create Models: { code, description }
    9.1 The code field need have a 4 chars.
    9.2 The description is required
    9.3 Exemple: sneakers, boots, sandals, polo, sleeveless...
  10. Create Sizes: { code, description }
    10.1 The code field need have a 4 chars.
    10.2 The description is required
    10.3 Exemple: 1, 10, S, M, L, Large...
  11. Create Products: { balance, description, category_code, color_code, model_code, size_code }
    10.2 All fiels is required
  12. GET, PUT and DELETE all register previously included

  Note: The Sku code is generated with the codes a dependencies:
    Exemple: category_code-color_code-model_code-size_code: 0000-0000-0000-0000
# routes
  * /users
    > post: create user
  * /sessions
    > post: create sessions
  * /categories
    > post: crete categories
    > get: find all categories
  * /categories?code=value
    > get: find categories with a code equal a value
  * /categories?description=value
    > get: find categ with a description equal a value
  * /categories/:code
    > put: update categories
    > delete: delete categories
  * /colors
    > post: crete colors
    > get: find all colors
  * /colors?code=value
    > get: find colors with a code equal a value
  * /colors?description=value
    > get: find color with description equal a value
  * /colors/:code
    > put: update colors
    > delete: delete colors
  * /models
    > post: crete models
    > get: find all models
  * /models?code=value
    > get: find models with a code equal a value
  * /models?description=value
    > get: find model with description equal a value
  * /models/:code
    > put: update models
    > delete: delete models
  * /sizes
    > post: crete sizes
    > get: find all sizes
  * /sizes?code=value
    > get: find sizes with a code equal a value
  * /sizes?description=value
    > get: find sizes with a description equal a value
  * /sizes/:code
    > put: update sizes
    > delete: delete sizes
  * /products
    > post: crete products
    > get: find all products
  * /products?code=value
    > get: find products with a code equal a value
  * /products?description=value
    > get: find products with a description equal a value
  * /products/:code
    > put: update products
    > delete: delete products
# Tests
  Run the 'yarn test' command

# Check the progress of tests created in the project
  Open the index.html file in a browser, located in the coverage/lcov-report folder at the root of the project
  Browse the files and see the percentage of Statements, branches, functions and lines covered by the tests

# extra information about the location of the files
## Existing entities in this project
  1. User
    fields: id, name, email, password
  2. size
    fields: code, description
  3. color
    fields: code, description
  4. model
    fields: code, description
  5. category
    fields: code, description
  6. product
    fields: sku, description, balance, category_code, model_code, color_code, size_code

## Stream file flow:
  1. @shared/infra/http/server
  2. @shared/infra/http/server/routes
  3. @module/moduleName/infra/http/routes/moduleName.route
  4. @module/moduleName/infra/http/controller/ModuleNameController
    4.1 @modules/moduleName/services/modulename/ActionModuleNameService.ts
      4.1.1 @modules/moduleName/repositories/IModuleNameRepository
        4.1.1.1 @modules/moduleName/dtos/IActionModuleNameDTO
          4.1.1.1.1 @modules/moduleName/infra/typeorm/entities/ModuleName
      4.1.2 @modules/moduleName/infra/typeorm/entities/ModuleName
    4.2 tsyringe.container.resolve(new ActionService)
      4.2.1 @modules/moduleName/repositories/IModuleNameRepository
        4.2.1.1 @modules/moduleName/dtos/IActionModuleNameDTO
          4.2.1.1.1 @modules/moduleName/infra/typeorm/entities/ModuleName
      4.2.2 @modules/moduleName/infra/typeorm/repositories/ModuleName
        4.2.2.1 @modules/moduleName/repositories/IModuleNameRepository
          4.2.2.1.1 @modules/moduleName/dtos/IActionModuleNameDTO
            4.2.2.1.1.1 @modules/moduleName/infra/typeorm/entities/ModuleName
        4.2.2.2 @modules/moduleName/dtos/IActionModuleNameDTO
          4.2.2.2.1 @modules/moduleName/infra/typeorm/entities/ModuleName

## Order of creation of files to add new entity or module
  1. @modules/moduleName/infra/typeorm/entities/ModuleName.ts
  2. @shared/infra/typeorm/migrations/timestamp-ActionModuleName.ts
  3. @modules/moduleName/dtos/IActionModuleNameDTO.ts
  4. @modules/moduleName/repositories/IModuleNameRepository.ts
  5. @modules/moduleName/infra/typeorm/repositories/ModuleName.ts
  6. @modules/moduleName/services/modulename/ActionModuleNameService.ts
  7. @module/moduleName/infra/http/controller/ModuleNameController.ts
  8. @module/moduleName/infra/http/routes/moduleName.route.ts

## Order of editing the files, after creating the previous files
  1.  @shared/container/index.ts
  2. @shared/infra/http/server/routes
