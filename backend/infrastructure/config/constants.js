const CONFIG_TYPE = 0;

switch (CONFIG_TYPE){
    case 0:
        module.exports = {
            SUPPORTED_DATABASE: {
                IN_MEMORY: {
                    DIALECT: 'in_memory',
                    URI: ''
                },
                MONGO: {
                    DIALECT: 'mongo',
                    URI: 'mongodb+srv://Group4Admin:IimqBTGDD0Q3Etz2@cluster0.x8gra.mongodb.net/magazine-test?retryWrites=true&w=majority' 
                        || 'mongodb://localhost:27017/magazine-test'
                }
            },

            ROLES: {
                ADMINISTRATOR: 'admin',
                MANAGER: 'manager',
                COORDINATOR: 'coordinator',
                STUDENT: 'student',
                GUEST: 'guest'
            }
        }
        break;
    default:
        throw new Error("NO CONFIGURATION SPECIFIED");
}
