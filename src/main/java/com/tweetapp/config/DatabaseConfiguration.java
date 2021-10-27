package com.tweetapp.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DatabaseConfiguration {
	
	public Connection getDatabaseConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");  
			Connection con=DriverManager.getConnection(  
			"jdbc:mysql://localhost:3306/tweetapp","root","1234567890");
			return con;
			
		} catch(Exception e){ 
			System.out.println("Error while connecting to database - "+e);
		}  
		return null;
	}
	
	public ResultSet runExecuteQuery(String query) {
		Connection con = getDatabaseConnection();
		if(con!=null) {
			try {
				Statement stmt= con.createStatement();  
				ResultSet rs=stmt.executeQuery(query);  
				return rs;
			}catch(Exception e){ 
				System.out.println("Error while running execute query - "+e);
			}  
		}
		return null;
	}
	
	public int runUpdateCreateQuery(String query) {
		Connection con = getDatabaseConnection();
		if(con!=null) {
			try {
				Statement stmt= con.createStatement();  
				int rs=stmt.executeUpdate(query);  
				return rs;
			}catch(Exception e){ 
				System.out.println("Error while running upsert query - "+e);
			}  
		}
		return -1;
	}


}
