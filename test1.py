


array=b'21,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2'
array=array.decode('utf8').split(',') 
new = [int(numeric_string) for numeric_string in array]
print(new)