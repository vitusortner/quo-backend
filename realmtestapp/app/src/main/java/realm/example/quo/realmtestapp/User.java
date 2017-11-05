package realm.example.quo.realmtestapp;

import io.realm.RealmObject;
import io.realm.annotations.Ignore;

//Realm Model Class
public class User extends RealmObject{
    protected String name;
    protected int age;
    @Ignore
    protected int sessionID;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getSessionID() {
        return sessionID;
    }

    public void setSessionID(int sessionID) {
        this.sessionID = sessionID;
    }
}
