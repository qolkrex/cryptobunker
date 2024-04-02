// import { Model, DataTypes, Sequelize } from 'sequelize';
// export const USER_TABLE = 'users';

// export const UserSchema = {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   createdAt: {
//     allowNull: false,
//     type: DataTypes.DATE,
//     field: 'created_at',
//     defaultValue: Sequelize.fn('now'),
//   },
// };

// export class User extends Model {
//   static associate() {
//     return {};
//   }
//   static config(sequelize:Sequelize) {
//     return {
//       sequelize,
//       tableName: USER_TABLE,
//       modelName: 'User',
//       timestamps: false,
//     };
//   }
// }
