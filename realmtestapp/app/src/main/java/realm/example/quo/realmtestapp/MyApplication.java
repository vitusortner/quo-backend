package realm.example.quo.realmtestapp;

import android.app.Application;

import io.realm.Realm;
import io.realm.RealmConfiguration;


public class MyApplication extends Application {

    @Override
    public void onCreate(){
        super.onCreate();
        Realm.init(this);
        /*
        In-memory realm config
        files created by an in-memory Realm will be deleted when the Realm is closed
        */
         RealmConfiguration config = new RealmConfiguration.Builder()
                 .name("myrealm.realm")
                 .inMemory()
                 .build();
        Realm.setDefaultConfiguration(config);
    }
}
