import { DynamicModule, Module } from "@nestjs/common";
import { HeaderResolver, I18nModule, I18nJsonLoader, AcceptLanguageResolver } from "nestjs-i18n";
import * as path from "path";

@Module({})
  class TranslationModule {
    static forRoot(group: string): DynamicModule {
        return {
          module: TranslationModule,
          imports: [
            I18nModule.forRoot({
              fallbackLanguage: 'en',
              loaderOptions: {
                path: path.join(__dirname, `/${group}`),
                watch: true,
              },
              resolvers: [
                new HeaderResolver(["x-locale"]),
                AcceptLanguageResolver
              ]
            }),
          ],
        };
      }
  }

  export default TranslationModule;