# Assignment 2 - TNM111
# Authors: Maria Brunned (marbr780) & Malva Jansson (malja934)
# Task: Implementing a scatter plot

# Import libraries 
import pandas as pd
import numpy as np
from tkinter import *
from collections import Counter

# Implemenatation
# Draw the x- and y-axis, together with ticks and tick values
# Display a legend that shows the categorial information
# Display categorical information of the data points by using different shapes to represent the points
# Display the data points correctly with respect to the axes
# Set the value range automatically based on the data vlaues presnet in the data set 

data1 = pd.read_csv("data1.csv",names=['x','y','group'])
data2 = pd.read_csv("data2.csv",names=['x','y','group'])

data = data1.to_numpy()# From csv to array
#print(data2)

#print(data1)
#print('\n')
#print(data2)
# get max and min value of column x and y
maxXY = data1.max()
minXY = data1.min()
print(minXY[1])

# Create an instance of tkinter frame or window
win=Tk()

# Set the size of the tkinter window 
winX = maxXY[0]+abs(minXY[0]) + 200
winY = maxXY[1]+abs(maxXY[1]) + 200
win.geometry(str(winX) + "x" + str(winY))

# Create a canvas widget
canvas = Canvas(win, width=winX, height=winY)
canvas.pack()
canvas.configure(scrollregion=canvas.bbox("ALL"))

# Add a line in canvas widget
offsetX = winX / 2
offsetY = winY / 2
canvas.create_line(offsetX,minXY[1]+offsetX,offsetY,maxXY[1]+offsetY, fill = "green", width=2)
canvas.create_line(minXY[0]+offsetX,offsetX,maxXY[0]+offsetY,offsetY, fill = "green", width=2)

# [row][column]
# Test
#canvas.create_oval((data[2][0])+offsetX,(data[2][1])+offsetY, (data[2][0])+offsetX,(data[2][1])+offsetY,fill='blue', width=4)
#canvas.create_oval((data[3][0])+offsetX,(data[3][1])+offsetY, (data[3][0])+offsetX,(data[3][1])+offsetY,fill='blue', width=4)

# Prints all dots 
i = 0
group = Counter(data1['group'])
# Gets the group types to compare them later to the dataset to draw the shapes
group_type = list(set(data1['group'])) 
#group_type2 = list(set(data2['group']))
#print(group_type2)


while (i < len(data)):

    # Circle
    if(data[i][2] == group_type[1]):
        canvas.create_oval((data[i][0])+offsetX,(data[i][1])+offsetY, (data[i][0])+offsetX,(data[i][1])+offsetY,fill='blue', width=4)

    if (data[i][2] == group_type[2]):
    # Square
        canvas.create_rectangle((data[i][0])+offsetX,(data[i][1])+offsetY, (data[i][0])+offsetX,(data[i][1])+offsetY,fill='blue', width=4)

    # Half circle(?)
    else:
        canvas.create_arc((data[i][0])+offsetX,(data[i][1])+offsetY, (data[i][0])+offsetX,(data[i][1])+offsetY,start= 0, extent = -180, fill='blue', width=4, style='chord')

    i = i+1

win.mainloop()

#df = pd.DataFrame(data1,columns = ['x','y','group'])
#ax1 = df.plot.scatter(x='x',y='y',c='DarkBlue')

#print(df)