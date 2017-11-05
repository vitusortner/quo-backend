package realm.example.quo.realmtestapp;

import android.app.Activity;
import android.os.Bundle;

import io.realm.Realm;
import io.realm.RealmResults;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Realm realm = Realm.getDefaultInstance(); //opens myrealm.realm
        try{
            final RealmResults<User> users1 = realm.where(User.class).findAll();
            System.out.println("User in realm: " + users1.size()); //number of users in realm

            User myUser = new User();
            myUser.setAge(42);
            myUser.setName("Tim");
            realm.beginTransaction();
            final User managedUser = realm.copyToRealm(myUser);
            realm.commitTransaction();

            final RealmResults<User> users2 = realm.where(User.class).findAll();
            System.out.println("User in realm: " + users2.size());
            User dbUser = users2.get(0);
            System.out.println(dbUser.getName());

        }finally {
            realm.close();//close connection
        }
    }
}
