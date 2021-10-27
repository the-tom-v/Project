package com.tweetapp.dao;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.tweetapp.config.DatabaseConfiguration;

public class UserDao {
	
	private static int usersCount = 0;
	private static DatabaseConfiguration db = new DatabaseConfiguration();
	
	public int getUsersCount(String tablename) {
		int count = 0;
		try {
			ResultSet rs = db.runExecuteQuery("select count(*)  as rowcount from "+tablename);
			rs.next();
			count = rs.getInt("rowcount");
		}catch (Exception e) {
			System.out.println("Error getting user count for table -"+tablename+" - "+e);
		}
		return count;
	}
	
	public void registerUser(String username,String password) {
		if(usersCount == 0) {
			usersCount = getUsersCount("users")+1;
		}
		boolean doesUserExist = checkUserExists(username);
		if(doesUserExist) {
			System.out.println("Username already exists !!");
			return;
		}
		try {
			db.runUpdateCreateQuery("insert into users(id,username,password) values("+usersCount+",'"+ username+"','"+ password+"')");
			usersCount+=1;
			System.out.println("User successfully created !!");
		}catch (Exception e) {
			System.out.println("Error regsitering user - "+e);
		}
	}
	
	public boolean logInUser(String username,String password) {
		try {
			ResultSet rs = db.runExecuteQuery("select count(*)  as entry from users where username='"+username+"' && password='"+password+"'");
			rs.next();
			int count = rs.getInt("entry");
			if (count>0) return true;
			
		}catch (Exception e) {
			System.out.println("Error while logging in- "+e);
		}
		return false;
	}
	
	public boolean resetUserPwd(String username,String password) {
		try {
			db.runUpdateCreateQuery("update users set password='"+ password+"' where username='"+ username+"'");			
		}catch (Exception e) {
			System.out.println("Error while resetting password- "+e);
		}
		return false;
	}
	
	public int getId(String username) {
		try {
			ResultSet rs = db.runExecuteQuery("select id from users where username='"+username+"'");
			rs.next();
			return rs.getInt("id");
		
		}catch (Exception e) {
			System.out.println("Error while logging in- "+e);
		}
		return 0;
	}
	
	public boolean publishTweet(String username,String tweet) {
		int userId = getId(username);
		int tweetId = getUsersCount("tweettbl");
		try {
			db.runUpdateCreateQuery("insert into tweettbl(tweet_id,user_id,tweet) values('"+tweetId+"','"+userId+"','"+ tweet+"')");
			return true;
		}catch (Exception e) {
			System.out.println("Error publishing Tweet- "+e);
		}
		return false;
	}
	
	public List<String> getAllTweetsByUsername(String username) {
		int userId = getId(username);
		List<String> tweetsList = new ArrayList();
		try {
			ResultSet rs = db.runExecuteQuery("select tweet  from tweettbl where user_id='"+userId+"'");
			while(rs.next()) {
				tweetsList.add(rs.getString("tweet"));
			}
			return tweetsList;
		}catch (Exception e) {
			System.out.println("Error fechting tweets for username - "+username+" - "+e);
		}
		return tweetsList;
	}
	
	public List<String> getAllTweets() {
		List<String> tweetsList = new ArrayList();
		try {
			ResultSet rs = db.runExecuteQuery("select tweet  from tweettbl");
			while(rs.next()) {
				tweetsList.add(rs.getString("tweet"));
			}
			return tweetsList;
		}catch (Exception e) {
			System.out.println("Error fechting tweets - "+e);
		}
		return tweetsList;
	}
	
	public List<String> getAllUsers() {
		List<String> namesList = new ArrayList();
		try {
			ResultSet rs = db.runExecuteQuery("select username  from users");
			while(rs.next()) {
				namesList.add(rs.getString("username"));
			}
		}catch (Exception e) {
			System.out.println("Error fechting users - "+e);
		}
		return namesList;
	}
	
	public boolean checkUserExists(String username) {
		List<String> usersList = getAllUsers();
		long  userCount = usersList.stream().filter(user -> user.equals(username)).count();
		if(userCount>0) {
			return true;
		}
		return false;
	}
	
	
	
	

}
