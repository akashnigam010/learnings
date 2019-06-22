Nodejs vs Java
===

0. Node is a runtime environment to run javascript, where Java is a language and has it own ecosystem of frameworks and libraries
1. Java is platform independant (JVM), whereas Node modules need to be rebuilt on a specific OS to run it. 
2. Node js is single threaded, where Java is multithreaded
3. Node is best used for I/O intensive applications where java is best suited for CPU intensive applications because it makes use of multiple threads. I/O ops like - chat and media streaming. CPU intensive ops like - graphics, video editing etc.
4. Node does have cluster module for using multiple threads but it is not as effecient as that in Java
5. Node by default works in non-blocking fashion, where java by default works in blocking fashion, thus speed of the application is far more in Node. Java can be made non-blocking but that will require extra efforts from the dev side
6. Node scales horizontally (adding more hardware) very well, but adding vertical scaling (processing power) is not that great because of its single threaded nature. Scaling java horizontolly is not that great. After a certain point, adding more servers do not improve the performance much