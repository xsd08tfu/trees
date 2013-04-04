<?php 
	header("Cache-Control: max-age=0, no-cache, no-store, must-revalidate");
	header("Pragma: no-cache");
	header('Content-type: text/cache-manifest'); 
	
	$hashes = "";
	
	function printFiles( $path = '.', $level = 0 ){ 
		global $hashes;
	    $ignore = array('.', '..','.htaccess','error_log','README.md','.git', 'cache.manifest.php');  

	    $dh = @opendir( $path ); 

	    while( false !== ( $file = readdir( $dh ) ) ){ 
	        if( !in_array( $file, $ignore ) ){ 
	            if( is_dir( "$path/$file" ) ){ 
	                printFiles( "$path/$file", ($level+1) ); 
	            } else { 
					$hashes .= md5_file("$path/$file");
	                echo $path."/".$file."\n";
	            } 
	        } 
	    } 

	    closedir( $dh ); 
	};
	echo "CACHE MANIFEST\n";
printFiles('.');
// version hash changes automatically when files are modified
echo "#VersionHash: " . md5($hashes) . "\n";
?>

NETWORK:


FALLBACK:
