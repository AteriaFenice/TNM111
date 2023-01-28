# Assignment 2 - TNM111
# Authors: Maria Brunned (marbr780) & Malva Jansson (malja934)
# Task: Implementing a scatter plot

# Import libraries 
import pandas as pd
import numpy as np
import math
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
print(data1)

#print(data1)
#print('\n')
#print(data2)
# get max and min value of column x and y
maxXY = data1.max()
minXY = data1.min()

# Create an instance of tkinter frame or window
win=Tk()

# Set the size of the tkinter window 
scale = 5 # otherwise window is too small
winX = scale * (maxXY[0]+abs(minXY[0])) + 200 # dynamically changed based on database
winY = scale * (maxXY[1]+abs(maxXY[1])) + 50
win.geometry(str(winX) + "x" + str(winY)) # set size of window

# Create a canvas widget
canvas = Canvas(win, width=500, height=300)
canvas.pack(fill="both", expand=True)

# Add a line in canvas widget
offsetX = (winX-100) / 2 # to get origin in center of window
offsetY = winY / 2
yAxis = scale*minXY[0]+offsetX, offsetY, scale*maxXY[0]+offsetX, offsetY # points of y-axis
xAxis = offsetX, scale*minXY[1]+offsetY, offsetX,scale*maxXY[1]+offsetY # points of x-axis

canvas.create_line(yAxis, fill = "black", width=2) # create y-axis
canvas.create_line(xAxis, fill = "black", width=2) # create x-axis

# ticks
for i in range(minXY[0], maxXY[0]):
    if(i%10 == 0 and i != 0): # ticks in intervals of 10
        canvas.create_line(scale*i+offsetX, -3+offsetY, scale*i+offsetX, 3+offsetY, fill = "black", width=1)
        tick = Label(win, text=str(i)).place(x=scale*i+offsetX, y=15+offsetY, anchor="center")


for i in range(minXY[1], maxXY[1]):
    if(i%10 == 0 and i != 0):
        canvas.create_line(-3+offsetX, scale*i+offsetY, 3+offsetX, scale*i+offsetY, fill = "black", width=1)
        tick = Label(win, text=str(-i)).place(x=-15+offsetX, y=scale*i+offsetY, anchor="center")


# [row][column]
# Test
#canvas.create_oval((data[2][0])*scale+offsetX,(data[2][1])*scale+offsetY, (data[2][0])*scale+offsetX,(data[2][1])*scale+offsetY,fill='blue', width=4)
#canvas.create_oval((data[3][0])*scale+offsetX,(data[3][1])*scale+offsetY, (data[3][0])*scale+offsetX,(data[3][1])*scale+offsetY,fill='blue', width=4)

# Prints all dots 
i = 0
group_amount = Counter(data1['group']) # Count how many of each type
group_type = np.sort(list(set(data1['group']))) # Gets the group types, sorted
#group_type2 = list(set(data2['group']))
print('groups: ', group_type)
print('how many of each group: ', group_amount)
size = 3 # Size of the points in the plot

# Left click event
def left_click(event):
    object_id = event.widget.find_withtag('current')[0] # get shape object id from click event
    tag = event.widget.gettags(object_id)[0] # get tag from object
    index = tag[5:] # index, remove "shape" from tag
    x = data[int(index)][0] # coordinates from data
    y = data[int(index)][1]

    # new grid system...
    print("clicked")



# Right click event
def right_click(event):
    object_id = event.widget.find_withtag('current')[0] # get shape object id from click event
    tag = event.widget.gettags(object_id)[0] # get tag from object
    index = tag[5:] # index, remove "shape" from tag
    x = data[int(index)][0] # coordinates from data
    y = data[int(index)][1]

    # find 5 closest with euclidian distance
    dist = []
    for i in range(len(data)):
        dist.append(math.sqrt(math.pow((x-data[i][0]),2)+math.pow((y-data[i][1]),2)))

    index_list = np.argpartition(dist, 6) # find 6 smallest distances
    five = index_list[:6]
    five = np.delete(five,0) # remove clicked element

    # highligt 5 closest
    size = 10
    for i in five:
         canvas.create_oval((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY+size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,fill=None, outline='red' )

    # remove ??

while (i < len(data)):

    # Prints the first group as circles
    if(data[i][2] == group_type[0]):
        canvas.create_oval((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY+size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,fill='blue', tags=("shape"+str(i)))

    # Prints the first group as squares
    if (data[i][2] == group_type[1]):
        canvas.create_rectangle((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY+size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,fill='blue', tags=("shape"+str(i)))

    # Prints the first group as triangles
    if(data[i][2] == group_type[2]):
        canvas.create_polygon((data[i][0])*scale+offsetX-size, -(data[i][1])*scale+offsetY-size, (data[i][0])*scale+offsetX+size, -(data[i][1])*scale+offsetY-size,  (data[i][0])*scale+offsetX, -(data[i][1])*scale+offsetY+size, fill='blue', tags=("shape"+str(i)))

    canvas.tag_bind(("shape"+str(i)), "<Button-1>", left_click) # left click interaction
    canvas.tag_bind(("shape"+str(i)), "<Button-3>", right_click)# right clivk interaction

    i = i+1


# LEGEND - lite skev, borde visa formerna
i=0
while (i < len(group_type)):
    shape = ['oval', 'rectangle', 'triangle']

    leg = Label(win, text=str(shape[i])+" = "+str(group_type[i])).place(relx=0.95, rely=0.1+0.05*i, anchor="ne")

    i = i+1


win.mainloop()

#df = pd.DataFrame(data1,columns = ['x','y','group'])
#ax1 = df.plot.scatter(x='x',y='y',c='DarkBlue')

#print(df)

