import numpy as np 

process=["P0","P1","P2","P3","P4"]

allocation = np.array([[0,1,0],
                       [2,0,0],
                       [3,0,2],
                       [2,1,1],
                       [0,0,2]]) 
# print(allocation)

Max = np.array([[7,5,3],
                [3,2,2],
                [9,0,2],
                [2,2,2],
                [4,3,3]])
# print(Max)

Available = np.array([3,3,2])
# print(Max)


# addA=0
# A=list(allocation[:,0])
# # print(A)
# for i in A:
#     addA=addA+i 
# print("Total No. of instance (A) : ",addA+Available[0])
# same for all resources.....


# add=0
# for i in range(0,3):
#     ABC=list(allocation[:,i])
#     print(ABC)
#     for j in ABC:
#         add=add+j
#     print("Total No. of instance (C) : ",add+Available[j])  


for i in range(0,3):
    ABC= sum(allocation[:,i])+Available[i]
    print("Total No. of instances ",chr(65+i),":",ABC)
    
print("-----------------------------------")   
print("Need Matrix :")
print("[A B C]")

needs = np.array([Max[i, :] - allocation[i, :] for i in range(5)])
print(needs)
print("-----------------------------------")


# for i in range(0,5):        
#     if any(needs[i] <= Available):
#         Available += allocation[i] 
#         print(process[i],"- True",Available) 
#     else :
#         print(process[i]," - False") 
#         break


true_process = []
false_process = []
new_allocation = []
for i in range(0,5):    
    if all(needs[i] <= Available):
        Available += allocation[i] 
        print(process[i]," - True |","Available = ",Available) 
        true_process.append(process[i])
    else :
        print(process[i]," - False")
        new_allocation.append(allocation[i])
        false_process.append(process[i])

# print(true_process)         
# print(false_process)
print("-----------------------------------")


# print(new_allocation)
# print(Available)
for j in range(0,len(false_process)):
    if all(needs[j] <= Available):
            Available += new_allocation[j] 
            print(false_process[j]," - True |","Available = ",Available) 

print("-----------------------------------")
safe_seq = true_process + false_process
print("Safe Sequence : ",safe_seq)