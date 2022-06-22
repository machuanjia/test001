/*
 * @Author: D.Y.M
 * @Date: 2021-12-16 10:02:59
 * @LastEditTime: 2022-03-07 16:46:53
 * @FilePath: /main/src/react-app-env.d.ts
 * @Description: 
 */
/// <reference types="react-scripts" />
declare module "*.less"

interface Window {
    APP_CONFIGURATION: {
        port: number,
        mode: string,
        api: string,
        server: string,
        apps: {
            data: {
                port: number
                api: string
                entry: string
                base_url: string
                public_path: string
            }
        }
    }
}