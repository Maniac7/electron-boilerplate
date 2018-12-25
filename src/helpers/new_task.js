import { app } from "electron";

export const createUserTask = (title, description, args, iconPath) => {
    app.setUserTasks([
        {
            program: process.execPath,
            arguments: args,
            iconPath: iconPath,
            iconIndex: 0,
            title: title,
            description: description
        }
    ]);
}
